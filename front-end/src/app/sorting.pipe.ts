import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(posts, category = ''): unknown {
    // if no category is choosed
    if (!category) {
      return posts
    }
    // if some category is choosed
    return posts.filter(posts => {
      return posts.category.toLowerCase() == category.toLowerCase()
    })
  }

}
