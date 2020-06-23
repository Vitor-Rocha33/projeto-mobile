import React from 'react'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import Calculator from './pages/Calculadora/Calculator'
import Browser from './pages/Browser/Browser'
import Diary from './pages/Diary/Diary'
import Map from './pages/Map/Map'

const menuRoutes = {
    Calculator: {
        name: 'Calculator',
        screen: props => <Calculator />,
        navigationOptions: {
            title:'Calculadora'
        }
    },
    Browser: {
        name: 'Browser',
        screen: props => <Browser/>,
        navigationOptions: {
            title:'Navegador'
        }
    },
    Diary: {
        name: 'Diary',
        screen: props => <Diary/>,
        navigationOptions: {
            title:'Agenda'
        }
    },
    Map: {
        name: 'Map',
        screen: props => <Map/>,
        navigationOptions: {
            title:'Mapa'
        }
    },
}

// const menuNavigator = createDrawerNavigator(menuRoutes)

const menuNavigator = createDrawerNavigator(
    {
        Calculadora: Calculator,
        Navegador: Browser,
        Agenda: Diary,
        Mapa: Map,
    }
)

const mainRoutes = {
    Calculator: {
        name: 'Calculator',
        screen: menuNavigator
    },
    Browser: {
        name: 'Browser',
        screen: Browser
    },
    Diary: {
        name: 'Diary',
        screen: Diary
    },
    Map: {
        name:'Map',
        screen: Map
    }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'Calculator'
})


const Routes = createAppContainer(mainNavigator)

// const Routes = createAppContainer(
//     createDrawerNavigator({
//         Calculadora: Calculator,
//         Navegador: Browser,
//     })
// )

// const Drawer = createDrawerNavigator(
//     {
//         Calculator: { screen: Calculator },
//         Browser: { screen: Browser },
//         Diary: { screen: Diary  }
//     },
//     {
//         initialRouteName: "Calculator",
//         unmountInactiveRoutes: true,
//         headerMode: "none",
//         contentComponent: props =><Sidebar {...props} />
//     }
// )

// const Routes = createAppContainer(
//     createDrawerNavigator(
//         {
//             Calculator: { screen: Calculator },
//             Browser: { screen: Browser },
//             Diary: { screen: Diary  }
//         },
//         {
//             initialRouteName: "Calculator",
//             unmountInactiveRoutes: true,
//             headerMode: "none",
//             contentComponent: props =><Sidebar {...props} />
//         }
//     )    
// )

export default Routes;

// const AppNavigator = createStackNavigator(
//      {
//          Drawer: { screen: Drawer }
//      },
//      {
//          initialRouteName: 'Drawer'
//      }
// )
