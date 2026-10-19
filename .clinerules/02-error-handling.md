# Error handling & validation

- **Fail early** with a **readable error message.** Detect wrong or missing
  things up front rather than letting the program fail later with a cryptic
  error.
- **Do not over-validate.** Leave flexibility for real data formats; stay
  idiomatic to the language.
- **Respect mathematical and logical validity.** Don't reject valid cases just
  because they're unusual, empty, or degenerate.
