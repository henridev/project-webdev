# CORS

![CORS](https://miro.medium.com/max/1400/0*heiz7awNkQ1B0O8e.png)
![pre flight request](https://miro.medium.com/max/880/0*SweGXbcps8xY31ds.png)

- wat is gefinieerd in access control origin header bepaalt welke domeinen toegang hebben
- credentials moeten op true gezet worden zodat credentials kunnen meegegeven worden
- default is dat bij cors geen cookies kunnen meegegeven worden om csrf te voorkomen moeten server en frontend daarom `credentials: 'include'` en `credentials: true` wat ervoor zorgt dat server in pre flight requiest het toevoegen van cookies in cors request toestaat

```typescript
const corsConfig: cors.Options = {
 allowHeaders: ['Accept', 'Content-Type', 'Authorization', 'Access-Control-Allow-Credentials', 'x-requested-with'],
 maxAge: 3 * 60 * 60,
 credentials: true
}

const registerCors = (app: Application) => {
 app.use(cors({
  ...corsConfig,
  origin: (ctx: Application.Context) => {
   if (origins.includes(ctx.request.header.origin as string)) {
    // hier word de origin header gezet naar de requester
    // als de requester deel uitmaakte van de whitelist
    return ctx.request.header.origin as string
   }
   return origins[0]
  }
 }))
}
```

dit zorgt voor volgende response header in pre-flight request

```none
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 10800
Access-Control-Allow-Methods: GET,HEAD,PUT,POST,DELETE,PATCH
Access-Control-Allow-Headers: Accept,Content-Type,Authorization,Access-Control-Allow-Credentials,x-requested-with
```

om extra veiligheid toe te voegen word er een redis store opgezet
