# XP Webcruiter integration

List your open job positions from Webcruiter on your Enonic XP site.

[![](https://repo.itemtest.no/api/badge/latest/releases/no/item/xp-webcruiter)](https://repo.itemtest.no/#/releases/no/item/xp-webcruiter)

![Feature toggle logo](src/main/resources/application.svg)

## Deploying

### Building

To build the project run the following code

```bash
enonic project build
```

### Deploy locally

Deploy locally for testing purposes:

```bash
enonic project deploy
```

### Deploy to Maven

```bash
./gradlew publish -P com.enonic.xp.app.production=true
```
