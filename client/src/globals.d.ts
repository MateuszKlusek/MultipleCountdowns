interface Navigator extends Navigator {
  virtualKeyboard: (options?: ShareData) => Promise<void>
}
