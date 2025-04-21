type Action = {
  type: string;
  payload?: unknown;
};

export function ActionProvider(actions: Action[]) {
  // Implement the action logic here
}