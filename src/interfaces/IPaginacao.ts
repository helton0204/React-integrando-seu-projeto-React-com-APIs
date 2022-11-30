export interface IPaginacao<T> { //<T> é generics, o tipo que for passado para essa interface vai ser o tipo do array results
    count: number
    next: string
    previous: string
    results: T[] 
}