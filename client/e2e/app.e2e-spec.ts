import { TitiPage } from './app.po';

describe('titi App', () => {
  let page: TitiPage;

  beforeEach(() => {
    page = new TitiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
