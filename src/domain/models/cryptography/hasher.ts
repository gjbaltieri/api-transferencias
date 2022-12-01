export interface Hasher {
  hash(value: string): Promise<string>
  compare(value: string, valueToCompare: string): Promise<boolean>
}
