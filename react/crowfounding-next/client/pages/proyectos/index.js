import React from 'react'
import ProyectoWeb3Container from '../../lib/ProyectoWeb3Container'
import {withRouter} from 'next/router'
import Layout from '../../components/Layaout'

const Proyecto = withRouter((props) => (
    <Layout>
       <h1>{props.router.query.address}</h1>
       <p>{props.router.query.texto}</p>
    </Layout>
))


export default () => (
    <ProyectoWeb3Container
      renderLoading={() => <div>Cargando la página. Aguarde por favor...</div>}
      render={({ web3, accounts, contract, address }) => (
        <Proyecto accounts={accounts} contract={contract} web3={web3} address={address} />
      )}
    />
  )
  