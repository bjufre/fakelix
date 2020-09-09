import React from 'react';
import { configure, shallow } from 'enzyme';
import ReactAdapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';


configure({ adapter: new ReactAdapter() });
