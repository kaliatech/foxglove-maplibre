import { Time } from "@foxglove/schemas/schemas/typescript/Time";

export function isTimeEqual(t1?: Time, t2?: Time): boolean {
  if (!t1 || !t2) {
    return false;
  }
  return t1.sec === t2.sec && t1.nsec === t2.nsec;
}
