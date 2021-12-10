// only thing this interface requires is a function named format which returns a string
export interface HasFormatter {
  format(): string;
}