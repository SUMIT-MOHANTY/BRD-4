import {render, screen, waitFor, fireEvent} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {MemberManagement} from '../pages/MemberManagement';

const server = setupServer(
  rest.get('/api/v1/members/', (req, res, ctx) => {
    return res(ctx.json({results:[{id:1,first_name:'John',last_name:'Doe',email:'john@example.com',phone:'+123456789',membership_status:'active'}],count:1}));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders member list and can open details', async () => {
  render(<MemberManagement />);
  expect(screen.getByText(/Member Management/i)).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText('John')).toBeInTheDocument());
  fireEvent.click(screen.getByText('John'));
  await waitFor(() => expect(screen.getByText('Member Details')).toBeInTheDocument());
});
