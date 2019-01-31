import React, { Component } from 'react'
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import Link from 'next/link'

export default class Header extends Component{
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
  
      return (
        <Menu size='large' inverted style={{marginTop: '10px'}}>
            <Menu.Item name='home' active={activeItem === 'home'} 
                        onClick={this.handleItemClick}>
            </Menu.Item>
 
          <Menu.Item
            name='messages'
            active={activeItem === 'messages'}
            onClick={this.handleItemClick}
          >¿Cómo Invertir?</Menu.Item>

          <Menu.Menu position='right'>
            <Dropdown item text='Soporte'>
              <Dropdown.Menu>
                <Dropdown.Item>Tutorial</Dropdown.Item>
                <Dropdown.Item>Contacto</Dropdown.Item>
                <Dropdown.Item>Acerca de</Dropdown.Item>
                <Dropdown.Item>Desarrollador</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
  
            <Menu.Item>
                <Link href='/proyectos/nuevo'>
                    <Button primary icon='add circle big'/>
                </Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      )
    }
}