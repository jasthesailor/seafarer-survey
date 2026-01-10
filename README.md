# Seafarer Survey — Debug Pack

This pack addresses two common issues:
1) **Login page jumps to dashboard** because the browser is already signed in (Auth persistence).
2) **Admin/Dashboard blank** because Firestore read is failing silently (rules, wrong collection, or running on file://).

## Important
- Use **VS Code Live Server** or Firebase Hosting. Do NOT open pages via file://.
- Firestore collection used: `seafarer-survey`

## FAST Firestore Rules
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /seafarer-survey/{docId} {
      allow read, create: if true;
      allow update, delete: if false;
    }
  }
}
```

## How to debug
- Open Admin/Dashboard and check the **status banner**.
- If you see `permission-denied`, your Firestore Rules are blocking reads.
- If you see `No documents found`, check the collection name in Firestore.

