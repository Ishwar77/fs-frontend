import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "trim",
  pure: false,
})
export class StringTrimmer implements PipeTransform {
  transform(data: string, maxLength: number) {
    if (!data || !maxLength || data.length < maxLength) {
      return data || "";
    }

    const sufix = "...";
    return maxLength > 3
      ? data.substr(0, maxLength - 3).trim() + sufix
      : data.substr(0, maxLength - 3).trim();
  }
}
