declare var Parser: {
    parse: (expr: string) => {
        toJSFunction: (params: string[]) => Function
    }
}