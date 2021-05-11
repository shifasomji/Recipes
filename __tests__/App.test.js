// In terminal run: jest App.test.js

import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import renderer from "react-test-renderer";
import App from "../App";
import Inventory from "../screens/Inventory";
import SignupScreen from "../screens/Signup";
import ReceiptScreen from "../screens/Receipt";
import RecipeScreen from "../screens/Recipe";
import VerifyDeducted from "../screens/VerifyDeducted";
import ReceiptProcessor from "../screens/ReceiptProcessor";

beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    jest.spyOn(console, 'debug').mockImplementation(jest.fn());
});

test('App stack renders correctly', () => {
  const { getByText } = render(<App />);
  expect(getByText('Receipt'));
});

test('Signup Screen renders correctly', () => {
  const tree1 = renderer.create(<SignupScreen />).toJSON();
  expect(tree1).toBeTruthy();
});

test('Signup Screen has a signup button', () => {
  const testIdName = 'Signup';
  const {getByTestId} = render(<SignupScreen />);
  const foundButton = getByTestId(testIdName);
  expect(foundButton).toBeTruthy();
});

test('Signup Screen accepts input', () => {
  const {getByTestId} = render(<SignupScreen />);
  const name = getByTestId('username');
  fireEvent.changeText(name, 'shifa');

  const pass = getByTestId('password');
  fireEvent.changeText(pass, 'abcd');

  const confirmPass = getByTestId('confirm password');
  fireEvent.changeText(confirmPass, 'abcd');
  
  expect(getByTestId('Signup')).toBeTruthy();
});

test('Inventory Screen renders correctly', () => {
  const tree = renderer.create(<Inventory />).toJSON();
  expect(tree).toBeTruthy();
});

test('Inventory Screen has a "show inventory" button', () => {
  const testIdName = 'show inventory';
  const {getByTestId} = render(<Inventory />);
  const foundButton = getByTestId(testIdName);
  expect(foundButton).toBeTruthy();
});

test('Receipt Screen renders correctly', () => {
  const tree2 = renderer.create(<ReceiptScreen />).toJSON();
  expect(tree2).toBeTruthy();
});

test('Receipt Screen has a "upload receipt" button', () => {
  const testIdName = 'upload receipt';
  const {getByTestId} = render(<ReceiptScreen />);
  const foundButton = getByTestId(testIdName);
  expect(foundButton).toBeTruthy();
});

test('Inventory Screen has a "verify ingredients" button', () => {
  const testIdName = 'verify receipt';
  const {getByTestId} = render(<ReceiptScreen />);
  const foundButton = getByTestId(testIdName);
  expect(foundButton).toBeTruthy();
});

test('Recipe Screen renders correctly', () => {
  const tree3 = renderer.create(<RecipeScreen />).toJSON();
  expect(tree3).toBeTruthy();
});

test('Recipe Screen has a "get recipe suggestions!" button', () => {
  const testIdName = 'recipe suggestions';
  const {getByTestId} = render(<RecipeScreen />);
  const foundButton = getByTestId(testIdName);
  expect(foundButton).toBeTruthy();
});

test('Recipe Screen shows the user diet', () => {
  const testIdName = 'diet';
  const {getByTestId} = render(<RecipeScreen />);
  const foundText = getByTestId(testIdName);
  expect(foundText).toBeTruthy();
});

test('Recipe Screen shows the ingredients the user wants to include', () => {
  const testIdName = 'include';
  const {getByTestId} = render(<RecipeScreen />);
  const foundText = getByTestId(testIdName);
  expect(foundText).toBeTruthy();
});

test('Recipe Screen shows the ingredients the user wants to exclude', () => {
  const testIdName = 'exclude';
  const {getByTestId} = render(<RecipeScreen />);
  const foundText = getByTestId(testIdName);
  expect(foundText).toBeTruthy();
});

test('Recipe Screen shows the ingredients causing allergies', () => {
  const testIdName = 'allergy';
  const {getByTestId} = render(<RecipeScreen />);
  const foundText = getByTestId(testIdName);
  expect(foundText).toBeTruthy();
});

test('Recipe Screen allows user to select diet', () => {
  const testIdName = 'select diet';
  const {getByTestId} = render(<RecipeScreen />);
  const foundSelect = getByTestId(testIdName);
  expect(foundSelect).toBeTruthy();
});

test('Recipe Screen allows user to select ingredients to include', () => {
  const testIdName = 'include select';
  const {getByTestId} = render(<RecipeScreen />);
  const foundSelect = getByTestId(testIdName);
  expect(foundSelect).toBeTruthy();
});

test('Recipe Screen allows user to select ingredients to exclude', () => {
  const testIdName = 'exclude select';
  const {getByTestId} = render(<RecipeScreen />);
  const foundSelect = getByTestId(testIdName);
  expect(foundSelect).toBeTruthy();
});

test('Recipe Screen allows user to select allergy causing ingredients', () => {
  const testIdName = 'select allergy';
  const {getByTestId} = render(<RecipeScreen />);
  const foundSelect = getByTestId(testIdName);
  expect(foundSelect).toBeTruthy();
});

test('Verify Deducted Screen renders correctly', () => {
  const tree = renderer.create(<VerifyDeducted />).toJSON();
  expect(tree).toBeTruthy();
});

test('Verify Deducted Screen allows user to change ingredient name', () => {
  const testIdName = 'change ingredient name';
  const {getByTestId} = render(<VerifyDeducted />);
  const foundSelect = getByTestId(testIdName);
  expect(foundSelect).toBeTruthy();
});

test('Verify Deducted Screen allows user to change ingredient quantity', () => {
  const testIdName = 'change ingredient quantity';
  const {getByTestId} = render(<VerifyDeducted />);
  const foundSelect = getByTestId(testIdName);
  expect(foundSelect).toBeTruthy();
});

test('Verify Deducted Screen allows user to change ingredient unit', () => {
  const testIdName = 'change ingredient unit';
  const {getByTestId} = render(<VerifyDeducted />);
  const foundSelect = getByTestId(testIdName);
  expect(foundSelect).toBeTruthy();
});

test('Verify Deducted Screen has a "done" button that records all user changes', () => {
  const testIdName = 'done';
  const {getByTestId} = render(<VerifyDeducted />);
  const foundSelect = getByTestId(testIdName);
  expect(foundSelect).toBeTruthy();
});

test('Receipt Processor Screen renders correctly', () => {
  const tree = renderer.create(<ReceiptProcessor />).toJSON();
  expect(tree).toBeTruthy();
});

test('Receipt Processor Screen allows user to change ingredient name', () => {
  const testIdName = 'change name';
  const {getByTestId} = render(<ReceiptProcessor />);
  const foundSelect = getByTestId(testIdName);
  expect(foundSelect).toBeTruthy();
});

test('Receipt Processor Screen allows user to change ingredient quantity', () => {
  const testIdName = 'change quantity';
  const {getByTestId} = render(<ReceiptProcessor />);
  const foundSelect = getByTestId(testIdName);
  expect(foundSelect).toBeTruthy();
});

test('Receipt Processor Screen allows user to set ingredient unit', () => {
  const testIdName = 'set unit';
  const {getByTestId} = render(<ReceiptProcessor />);
  const foundSelect = getByTestId(testIdName);
  expect(foundSelect).toBeTruthy();
});

test('Receipt Processor Screen allows user to set ingredient category', () => {
  const testIdName = 'set category';
  const {getByTestId} = render(<ReceiptProcessor />);
  const foundSelect = getByTestId(testIdName);
  expect(foundSelect).toBeTruthy();
});

test('Receipt Processor Screen has a "done" button that records all user changes', () => {
  const testIdName = 'done';
  const {getByTestId} = render(<ReceiptProcessor />);
  const foundSelect = getByTestId(testIdName);
  expect(foundSelect).toBeTruthy();
});







