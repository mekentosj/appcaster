## Appcaster

Appcaster is a release manager.  It can be used to upload builds, organise them into channels, and then release them to users.

### Roadmap

<https://github.com/mekentosj/config-cloud/issues/19>

### API documentation

#### Authentication

HTTP basic auth is used.

#### Creating a build

Make a `POST` to `/apps/:app_id/builds`.

```
curl -H "Content-Type: application/json" \
  -X POST \
  -d '{ build fields }' \
  http://user:pass@appcaster.example.com/apps/example/builds
```

Example request body:

```json
{
  "enclosureUrl": "http://downloads.mekentosj.com/papers_3017_5a7295b.dmg",
  "pubDate": "Fri Feb 07 16:51:43 +0000 2014",
  "title": "Papers 3.0.17",
  "version": "3.0.17",
  "minimumSystemVersion": "10.7.0",
  "length": "72528999",
  "type": "application/octet-stream",
  "releaseNotesLink": "http://www.papersapp.com/papers/update/papers_3017.html",
  "shortVersionString": "Papers 3.0.17",
  "dsaSignature": "MCwCFF5FXnYXaOJelqwHcYAL018HHdsnAhRAh1+/KbfEzeL184/X/2WxV7mdXQ=="
}
```
