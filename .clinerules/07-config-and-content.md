# Configuration, content & test data

- **Keep data out of implementing modules.** Text content (help pages, labels)
  and temporary development/test constants (mock records, fixtures) live in an
  outer `src/config/` directory — not embedded in the component/module that
  implements the behaviour.
- **One transport.** Global config, content and test data are passed from the
  top level to the components that display them through a single provide/inject
  composable (`useAppConfig()`). The provider sits in the app root; consumers
  call the composable instead of importing individual data files directly.
- **Components hold behaviour, not data.** A component renders whatever config
  it is given; it does not own the text or the mock data it shows.
