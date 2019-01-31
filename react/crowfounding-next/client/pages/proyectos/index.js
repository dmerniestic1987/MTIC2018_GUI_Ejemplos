import React from 'react'
import FactoryWeb3Container from '../../lib/FactoryWeb3Container'
import {withRouter} from 'next/router'
import Layout from '../../components/Layaout'

const Proyecto = withRouter((props) => (
    <Layout>
       <h1>{props.router.query.address}</h1>
       <p>{props.router.query.texto}</p>
    </Layout>
))


export default () => (
    <FactoryWeb3Container
      renderLoading={() => <div>Cargando la página. Aguarde por favor...</div>}
      render={({ web3, accounts, contract }) => (
        <Proyecto accounts={accounts} contract={contract} web3={web3} />
      )}
    />
  )
  