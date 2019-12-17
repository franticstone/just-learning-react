import { configure } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';

const req = require.context('../', true, /story\.jsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);