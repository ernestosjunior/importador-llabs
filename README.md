# REST API Starter

This is a RESTful API Starter with a single API endpoint.

## Prerequisites 

**Install Encore:**
- **macOS:** `brew install encoredev/tap/encore`
- **Linux:** `curl -L https://encore.dev/install.sh | bash`
- **Windows:** `iwr https://encore.dev/install.ps1 | iex`

## Run app locally

Run this command from your application's root folder:

```bash
encore run
```
### Using the API

To see that your app is running, you can ping the API.

```bash
curl -X POST "http://localhost:4000/orders" \
  -F "file=@./dados_legacy.txt;type=text/plain"
```

## Testing

To run tests:

```bash
encore test
# or
npm run test
```

To run tests coverage:


```bash
encore test --coverage
# or
npm run test:coverage
```

### Learn more

There are many more features to explore in Encore.ts, for example:

- [Request Validation](https://encore.dev/docs/ts/primitives/validation)
- [Streaming APIs](https://encore.dev/docs/ts/primitives/streaming-apis)
- [Cron jobs](https://encore.dev/docs/ts/primitives/cron-jobs)
- [Pub/Sub](https://encore.dev/docs/ts/primitives/pubsub)
- [Object Storage](https://encore.dev/docs/ts/primitives/object-storage)
- [Secrets](https://encore.dev/docs/ts/primitives/secrets)
- [Authentication handlers](https://encore.dev/docs/ts/develop/auth)
- [Middleware](https://encore.dev/docs/ts/develop/middleware)