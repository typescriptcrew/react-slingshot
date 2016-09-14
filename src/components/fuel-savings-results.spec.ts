import * as chai from 'chai';
import * as cheerio from 'cheerio';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import FuelSavingsResults from './fuel-savings-results';
import {IFuelSavingsResultsProps} from './fuel-savings-results';

chai.should();

/*This test file displays how to test a React component's HTML
  outside of the browser. It uses Cheerio, which is a handy
  server-side library that mimics jQuery. So to test a React
  components HTML for a given state we do the following:
  1. Instantiate the component and pass the desired prop values
  2. Use ReactDOMServer to generate the resulting HTML
  3. Use Cheerio to load the HTML into a fake DOM
  4. Use Cheerio to query the DOM using jQuery style selectors
  5. Assert that certain DOM elements exist with expected values.
 */
describe('Fuel Savings Calculator Results Component', () => {
  describe('Savings label', () => {
    it('displays as savings when savings exist', () => {
      // arrange
      const props: IFuelSavingsResultsProps = {
        savings: {
          annual: '120',
          monthly: '10',
          threeYear: '360'
        }
      };

      const sut = React.createElement(FuelSavingsResults, props);

      // act
      const html = ReactDOMServer.renderToStaticMarkup(sut);
      const $ = cheerio.load(html);
      const fuelSavingsLabel = $('.fuel-savings-label').html();

      // assert
      fuelSavingsLabel.should.equal('Savings');
    });

    it('display as loss when savings don\'t exist', () => {
      // arrange
      const props: IFuelSavingsResultsProps = {
        savings: {
          annual: '-120',
          monthly: '-10',
          threeYear: '-360'
        }
      };

      const sut = React.createElement(FuelSavingsResults, props);

      // act
      const html = ReactDOMServer.renderToStaticMarkup(sut);
      const $ = cheerio.load(html);
      const fuelSavingsLabel = $('.fuel-savings-label').html();

      // assert
      fuelSavingsLabel.should.equal('Loss');
    });
  });
});
