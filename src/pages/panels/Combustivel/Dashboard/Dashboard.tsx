import { useNavigate } from 'react-router-dom';
import Header from '../../../../components/Header/Header';

const DashboardAbastecimento = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header title={'Abastecimento'} description={'Visualize e filtre os dados de gastos com combustível.'} onBackToHub={() => navigate('/hub')} lastUpdate={'dd/mm/yyyy'}/>
      
    </div>
    
  );
}

export default DashboardAbastecimento;