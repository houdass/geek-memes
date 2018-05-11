export class Page {
  public title: string;
  public component: any;
  public icon: string;
  public active: boolean;
  public tag?: boolean;

  constructor(title, component, icon, active, tag?) {
    this.title = title;
    this.component = component;
    this.icon = icon;
    this.active = active;
    this.tag = tag;
  }
}
