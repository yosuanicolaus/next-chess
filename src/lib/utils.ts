import { customAlphabet } from "nanoid";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";

const numbers = "0123456789";
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const alphabet = numbers + upper + lower;

export const generateGameID = customAlphabet(alphabet, 10);

export function generateName() {
  let name = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    style: "capital",
    separator: "",
  });
  name += Math.floor(Math.random() * 100);
  return name;
}
