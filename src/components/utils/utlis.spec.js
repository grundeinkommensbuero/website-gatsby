import { getFilteredElementsByContentfulState } from './index';

const testElements = [
  {
    ags: [],
    sectionId: 'TestComponentOne',
  },
  {
    ags: ['11000000'],
    sectionId: 'TestComponentOne',
  },
  {
    ags: [],
    sectionId: 'TestComponentTwo',
  },
  {
    ags: [],
    sectionId: 'TestComponentThree',
  },
];

const testMunicipalityContext = {
  ags: '02000000',
};

describe('Utils', () => {
  it('filters components from Contentful correctly', () => {
    const testResult = getFilteredElementsByContentfulState({
      elements: testElements,
      municipality: testMunicipalityContext,
      isAuthenticated: true,
      userData: {
        municipalities: [
          {
            name: 'Berlin',
            ags: '11000000',
          },
        ],
      },
    });

    expect(
      testResult.filter(result => result.sectionId === 'TestComponentOne')
        .length
    ).toBe(1);
    expect(testResult.length).toBe(3);
  });
});
