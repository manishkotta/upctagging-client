

export class Utilities {

  AssignObjectWithOutReference(prevObj: any, currObj: any) {
    for (var i in prevObj) {
      if (currObj.hasOwnProperty(i)) {
        if (typeof (currObj[i]) === "object") {
          this.AssignObjectWithOutReference(prevObj[i], currObj[i]);
        } else
          currObj[i] = prevObj[i];
      }
    }
  }
}
