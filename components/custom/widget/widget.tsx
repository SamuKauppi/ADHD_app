import { KUTRI_COLORS } from '@/lib/brand-colors';
import { StyleSheet, Text, View } from 'react-native'
import { ProgressBar } from 'react-native-paper';

type WidgetProps = {
    title?: string;
    value?: number;
    maxValue?: number;
}

const Widget = ({ title, value = 0, maxValue = 100 }: WidgetProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>

    <View style={styles.barContainer}>
      <ProgressBar 
      progress={value / maxValue} 
      style={styles.progressbar} 
      color={KUTRI_COLORS.card}/>
    </View>

    <Text style={styles.value}>{value} %</Text>
  </View>
)



export default Widget

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
  },
  title: {
    width: 120,    
    color: 'white',
    fontSize: 18,
  },
  barContainer: {
    flex: 1,        
    marginRight: 10
  },
  progressbar: {
    height: 20,
    borderRadius: 10,
    backgroundColor: KUTRI_COLORS.background
  },
  value: {
    width: 50,      
    color: 'white',
    fontSize: 18,
    textAlign: 'right',
    fontWeight: 'bold'
  }
})
