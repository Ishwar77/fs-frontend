import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "highlight",
  pure: false,
})
export class HighlightPipe implements PipeTransform {
  transform(data: string, pattern: string) {
    if (!data || !pattern) {
      return data || "";
    }

    if (data.toLowerCase().indexOf(pattern.toLowerCase()) < 0) {
      return data;
    }
    return data.replace(new RegExp(pattern, "gi"), (match) => {
      return "<mark>" + match + "</mark>";
    });
  }
}
