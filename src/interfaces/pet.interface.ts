import { Category } from "./category.interface"
import { Tags } from "./tags.interface"

export interface Pet {
    id: number,
    name: string,
    category: Category,
    photoUrls: string[],
    tags: Tags[],
    status: string
}