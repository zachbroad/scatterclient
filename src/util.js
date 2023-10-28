export const ApplicationStatus = Object.freeze({
  InMainLobby: Symbol("In Main Lobby"),
  InGame: Symbol("In Game"),
})

export const GameStatus = Object.freeze({
  Waiting: "Waiting",
  Starting: "Starting",
  InProgress: "In Progress",
  Scoring: "Scoring",
  Results: "Results",
});
