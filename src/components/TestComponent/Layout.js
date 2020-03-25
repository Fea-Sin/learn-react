import React from 'react';
import { ThemeContext, UserContext } from '@/context/ThemeContext';

function Sidebar() {
  return (
    <div>
      <div>Sidebar</div>
    </div>
  )
}
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <div>
              <div>Content</div>
              <Proile theme={theme} user={user} />
            </div>
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  )
}

function Proile(props) {
  return (
    <div>
      <div>The Theme is {props.theme}</div>
      <div>The User is {props.user.name}</div>
    </div>
  )
}


export default function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  )
}
