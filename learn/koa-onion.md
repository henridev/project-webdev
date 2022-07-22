defined inside listen is the serve r creqtion the curried function callback is used
to generate a handle request function

```javascript
// inside listen
http.createServer(this.callback())
```

defined inside listen is the serve r creqtion the curried function callback is used
to generate a handle request function

```javascript
callback () {
	// the middleware array is made by calling app.use
	const fn = compose(this.middleware)

	if (!this.listenerCount('error')) this.on('error', this.onerror)

	const handleRequest = (req, res) => {
		const ctx = this.createContext(req, res)
		return this.handleRequest(ctx, fn)
	}

	return handleRequest
	}
```

```javascript
handleRequest (ctx, fnMiddleware) {
	const res = ctx.res
	res.statusCode = 404
	const onerror = err => ctx.onerror(err)
	const handleResponse = () => respond(ctx)
	// execute callback on request closure
	onFinished(res, onerror)
	return fnMiddleware(ctx).then(handleResponse).catch(onerror)
}
```

```javascript
function compose (middleware) {
	if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
	for (const fn of middleware) {
		if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
	}

	// fnMiddleware calls this
	return function (context, next) {
		// last called middleware #
		let index = -1
		(function dispatch (i) {
			if (i <= index) return Promise.reject(new Error('next() called multiple times'))
			index = i
			let fn = middleware[i]
			if (i === middleware.length) fn = next
			if (!fn) return Promise.resolve()
			try {
				// dispatch.bind(null, i + 1)  is the next function passed to the middleware
				return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
			} catch (err) {
				return Promise.reject(err)
			}
		})(0)
		// start with execution of first middleware
	}
}
```

promises get added to the stack which allows us to retraverse them once all the middleware is executed:

- When executing dispatch(0) , Promise.resolve(fn(context, dispatch.bind(null, 0 + 1))) is executed
- first middleware content will run until await next()
- next() = dispatch.bind(null, 0 + 1) , which is the second middleware
- second middleware will run until await next()
- next() = dispatch.bind(null, 1 + 1), which is the third middleware
- third middleware will run until await next()
- next() = dispatch.bind(null, 2 + 1), there is no fourth middleware, it will return immediately by if (!fn) return Promise.resolve() , the await next() in third middleware is resolved, remaining code in third middleware is executed.
- the await next() in second middleware is resolved, remaining code in second middleware is executed.
- await next() in first middleware is resolved, remaining code in first middleware is executed.

```javascript
/*
next = add to stack
stack = [
	mw3
	mw2
	mw1
]
*/
const middleware1 = async (_ctx: Koa.Context, next: Koa.Next) => {
	console.log(1)
	await next()
	console.log(6)
}

const middleware2 = async (_ctx: Koa.Context, next: Koa.Next) => {
	console.log(2)
	await next()
	console.log(5)
}

const middleware3 = async (_ctx: Koa.Context, next: Koa.Next) => {
	console.log(3)
	await next()
	console.log(4)
}

app.use(middleware1)
app.use(middleware2)
app.use(middleware3)
```