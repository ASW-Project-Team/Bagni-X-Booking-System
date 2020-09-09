export interface AlertDialogData {
  content: string,
  positiveAction: {
    text: string,
    execute: (() => void)
  },
  negativeAction: {
    text: string,
    execute: (() => void)
  }
}
