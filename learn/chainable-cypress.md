
## Understanding Cypress’s command execution order and Chainables

![](https://cdn-images-1.medium.com/max/2000/0*MIWHakDVXEaCWJ96)

As I described in my previous post, at first sight Cypress’s code looks synchronous, as you don’t need to use the await keyword or promises, at least for the basic stuff. Here’s a simple test code in Cypress:

```javascript
it('log in', function () {
	cy.visit('/login')
	cy.get('input[name=username]').type(username);
	cy.get('input[name=password]').type(password);
	cy.contains('Login').click();

	cy.url().should('include', '/dashboard');
});
```

However, when you want to use a result of one command as an input to another command, things start to get more complex. In addition, if you’re trying to use some conditional logic, loops, etc., things may not behave as you expect. I agree with Cypress’s documentation that conditional logic in tests is pretty much [discouraged](https://docs.cypress.io/guides/core-concepts/conditional-testing.html#The-problem), but there are cases, mostly when you write reusable, more infrastructure-y code, where you do need it. Here’s a typical scenario where you need to use a value returned from one command as an input to another command:

1. Create an order with 2 items
2. Save the order (as a result, the system generates a unique id for that order)
3. Open the Search Order dialog
4. Enter the order ID
5. Verify that the order is found and that it contains the 2 items

> Note: the creation of the order may be done via the UI or via API, but it doesn’t really matter for our discussion.

For the sake of simple explanation, we’ll use a simplified and less realistic example, but the idea is the same. We’ll use a page that employs the Math.random() function to generate a random number. The test will then just log the result. Here’s the page source:

**RandomTest.html**

```html
<html>
  <body onload="document.getElementById('span1').innerHTML = Math.random()">
    <span id="span1" />
  </body>
</html>
```

Naively, we could try to write the Cypress test something like this:

```javascript
it('log random number - not working', () => {
	cy.visit("randomtest.html");
	const span = cy.get("#span1");
	cy.log(span.text());
	// Do more stuff…
});
```

But apparently this isn’t working. The result looks like this, The correct solution would be:

```javascript
it('log random number - working', () => {
	cy.visit("randomtest.html");
	cy.get("#span1").then(span => cy.log(span.text()));
	// Do more stuff…
});
```

Which passes, and logs the random number correctly:

But what’s happening here?? Before I’ll explain why the second solution works and the first one doesn’t, there may be few questions that may not be clear to you:

* Why does it say in the first test that “span.text is not a function”, while in the 2nd test we do use it as a function?
* Why do I need to write my code in such a cumbersome way?
* Is this then function a Promise? Does it mean that the code runs asynchronously and concurrently?

In order to understand what’s happening here and answer these questions, we need to understand JavaScript’s concurrency model and Cypress’s approach for dealing with the limitations of this model.

## Understanding JavaScript concurrency model

As surprising as it may sound, unlike most modern programming languages, JavaScript does not support multi-threading. Modern browsers do use separate threads for different tabs and windows, but for each tab, all JavaScript code, as well as all UI-rendering functionality, is executed on a single thread in a sequential manner.

This means that if a function performs a long (or endless) loop, the browser’s page get stuck. For example, try saving the following HTML to a file and open it in Chrome:

```html
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Wait 5 seconds</title>
    <script>

        function wait5seconds() {
            var start = new Date().getTime();
            var end = start;
            while (end < start + 5000) {
                end = new Date().getTime();
            }

            document.getElementById("myInput").value = "Done";
        }

    </script>
</head>
<body>
    <button id="myButton" onclick="wait5seconds()">Click me!</button>
    <input id="myInput"/>
</body>
</html>
```

If you click the button on that page, the text “Done” will be entered to the text box after 5 seconds. However, during these 5 seconds the page will be completely frozen. Even the mouse cursor won’t change when you hover over the text box as it normally does, during these 5 seconds. If your reload the page, click the button again, click inside the text box and start typing some text before the 5 seconds elapsed, you’ll notice that the text you typed will be displayed only after those 5 seconds, together with the “Done” word. The text you typed will be inserted in the middle of the “Done” word according to the exact point you clicked in the text box, as if you clicked and typed *after* the 5 seconds have elapsed.

The reason for this behavior is that the event handler of the button performs a *busy-loop* for 5 seconds. Any other event that occurs within these 5 seconds (like clicking inside the text-box and typing text) is kept in an internal queue and only handled after the current event handler completes.

However, the reason that most websites are not frozen most of the time, is that in most cases, applications just sits *idle* most of the time, waiting for events. When an event arrives, an event handler, which is typically very quick, is invoked and then gets back to idle. Besides keyboard and mouse events, events can also be raised by timers and by responses to server requests.

Let me elaborate about the request and response thing: Each time before the browser’s JavaScript code sends a request to the server, it sets an event handler (callback function) for handling the response. After sending the request, the browser gets back to idle. When the server’s response arrives, the event handler is invoked, performing whatever the application should do with the response, like updating the data displayed in the UI. However, the handler will only be called [when](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop) the page will be in idle state.

> Note: You can find more information about JavaScript concurrency model [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop).

Now we’re ready to understand how cypress works and why.

## What would happen if Cypress would perform its actions sequentially

Let’s consider what would have happened if cypress would have been implemented naively, such that when the click command is called, it simply calls the event handler of the button. Because your test code in cypress runs inside the browser’s context (and thread), if a test would need to click a button whose handler sends a request to the server, then when the handler would be called, the request would be sent to the server as expected. However, the handler will complete right after sending the request, returning to the test code to perform the next action, and before the server returned the response. But this way, as long as the test code runs, it won’t reach idle state and so the handler for the response will only be called after all tests are completed. Obviously that’s too late…

## How Cypress really works

Before I’ll explain how Cypress works, let me show you a demo that will probably surprise you. Copy the following test to your Cypress project (or an empty one):

```javascript
describe("How Cypress works", () => {

    it("Runs the click command only at the end", () => {
        cy.visit("https://www.google.com");
        cy.get("[name=q]").type("Cypress");
        alert("Hey! you must click OK in order to continue.");
    });
});
```

In this demo, we call [alert](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) at the end of the test. Because the test runs inside the browser, this call actually pops-up an alert dialog with the specified message and does not continue until the user clicks OK. (Note: unlike other JavaScript functions, this function blocks the main thread until the user clicks OK. This is probably due to historic reasons, but it helps us debug and demonstrate how Cypress works).

The interesting question is *when* this alert is displayed… By reading the body of the test function it looks like the alert should be displayed after typing “Cypress” at Google’s search box. But if you’ll run it you’ll see that it’s displayed **before**!

So what’s going on here?

The answer is that in order to avoid the starvation problem mentioned above, where the test don’t let the application process responses, Cypress **doesn’t perform any real action** when its corresponding command function (e.g. cy.get, cy.click, etc.) is called! Instead, it only stores in a queue the data needed to run this command later on. Only when it completes running the body of the test function (the body of the it) it starts invoking the commands that were added to the queue earlier. Because the alert function is not a Cypress command, it is executed immediately and not added to the queue. That’s why the alert window is displayed *before* all other commands.

## Chainables

Getting back to the example above, we can now understand why the naive approach didn’t work. The caveat is clearly in the following two lines:

 <iframe src="https://medium.com/media/894f9c6a3f4cf57ad6693615fd90503c" frameborder=0></iframe>

In fact, In order to better understand what’s happening, let’s break the second line into two, as follows:

 <iframe src="https://medium.com/media/163c41e470da0932d37d1c9d8965156e" frameborder=0></iframe>
>  Note: As far as JavaScript is concerned, these two snippets of code are semantically the same. Let alone, as far as Cypress is concerned, the difference is completely transparent.

The reason that span.text() is not recognized as a function is that text() is a function of a JQuery element object (and not a Cypress specific command), but span is not a JQuery element object. Instead, it’s a Chainable object. A Chainable object is what all Cypress commands return, and are what is stored in the queue of commands mentioned above. As explained, the commands don’t actually perform the action right away, but only when the commands in the queue are getting processed, after the entire test function body completes. The most important method on the Chainable object is then, which takes a callback function to invoke when the command completes. That callback function can take an argument which receives the result of the completed command. That’s why the mentioned solution works:

cy.get(“#span1”).then(span => cy.log(span.text()));

Again, in order to better understand what’s going on let’s break this line to smaller pieces:

 <iframe src="https://medium.com/media/52224576b2ea22a0ac4d7396a06c4acc" frameborder=0></iframe>

Now let’s examine the execution order:

 1. cy.get is getting called, which only adds the command to the queue and returns the chainable object, which we also assign to the constant named chainable.

 2. The callback constant is being assigned to the specified function. However, that function doesn’t get invoked yet.

 3. The then method is called, chaining the callback to the command (but again, still doesn’t invoke the callback)

 4. Now, after the body of the test function completed, the only command in the queue (which is the get command) is invoked, finding the element on the page

 5. After the get command completes, the chained callback is invoked. Cypress passes the result of the get command (which is the span JQuery element) to the callback function.
Note: Cypress’s get command tries to find the element repeatedly until it’s found or until a timeout of 4 seconds (by default) elapses.

 6. The span.text() function is called. This is not a Cypress command, so it gets invoked immediately, setting the value of the text constant to the text of the element.

 7. The cy.log command is invoked, logging the value of text. (More on that step later)

If you’re familiar with Promises in JavaScript, then Chainables should look very familiar to you. However, there’s a small difference: With promises, you can typically invoke few commands which their completion order is not determined. Cypress’s command queues ensure that the commands are executed in order, each command starts after the previous one completes.

## Commands inside the callback

In the last example, the callback contains the command cy.log. Neither when the callback is created (step 2 above), nor when it’s chained to the cy.get command (step 3), Cypress doesn’t add the log command to the queue yet (in fact, it’s technically impossible, because Cypress cannot inspect the content of the function without invoking it). However, Cypress doesn’t just adds it this command to the regular queue of commands, because if we had more commands after this then command, we would want the commands inside the then callback to be called before the next commands and not after all of them. For that reason, before Cypress invokes the callback (step 5), it creates a new, separate, “inner” queue for the commands that will be created inside the callback. When it calls cy.log during the callback, it doesn’t invoke it directly. Instead, it only adds this command to that inner queue, just like it would if the command would be called from the test function itself, though it uses the inner queue instead of the normal one. When the callback returns, Cypress invokes the commands in the inner queue, starting each one when the previous one completes. Only when the last command in the inner queue competes, it continues invoking other commands from the outer queue.

Clearly, then callbacks can be used in a nested manner as many levels as you need, each creating its own queue of commands.

## Other challenges

Now that we understand how Cypress commands and Chainables work, we can understand other challenges that many Cypress developers face: For example, an if condition that depends on values returned from commands cannot be used directly in the test function. Instead, it must be used inside a then callback that is chained to the command whose result should be evaluated in the condition. In addition, if you need to compare the text of two elements you must have 2 nested callbacks, like that:

 <iframe src="https://medium.com/media/5a985a1279d41506e544d2597186886d" frameborder=0></iframe>

If you only need this condition as an assertion, it’s better to use should instead, which itself works something like a command (this is out of the scope of this post though). But if for some reason you need to do something else in this case, then this is probably the way to go.

Loops are a similar challenge, though more tricky. While in many cases you can (and should) use the “each” command to handle looping of the results of the previous commands, there may be cases where the loop condition is more complicated and each won’t do the job. In these cases, you should assign the callback function to a variable (or constant), and call it recursively until the condition is met. For example:

 <iframe src="https://medium.com/media/4fb20383e00d0b538180d6a12efe4fc4" frameborder=0></iframe>

## Summary

Cypress may look very intuitive for most command and simple things. However, when things start to get bit more complicated, it may become very confusing. This is not Cypress’s fault, but rather constraints that are imposed by JavaScript asynchronous model as explained above. However, if you understand how it works (which I hope that if you got here you do), then you should know how to deal with these challenges.
