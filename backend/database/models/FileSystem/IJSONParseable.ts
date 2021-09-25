

export interface IJSONParseable<T>{
    deserialize(input: Object): T;
}