import { Category } from "./category"
import { Tags } from "./tags"

export interface Pet {
    id: number,
    name: string,
    category: Category,
    photoUrls: string[],
    tags: Tags[],
    status: string
}