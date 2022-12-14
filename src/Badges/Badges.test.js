import renderer from 'react-test-renderer'; 
import Badges from './Badges'; 
import React from 'react'; 

test('renders Badges component', () => { 
    const tree = renderer.create(<Badges />).toJSON(); 
    expect(tree).toMatchSnapshot(); 
});