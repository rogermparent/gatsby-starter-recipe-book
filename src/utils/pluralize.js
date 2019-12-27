export default (number, ifPlural = "s", ifNotPlural = "") =>
  number === 1 ? ifNotPlural : ifPlural
