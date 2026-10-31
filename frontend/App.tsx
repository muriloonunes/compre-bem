import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';
import TelaListaProdutos from './src/screens/TelaListaProdutos';
import TelaDetalheProduto from './src/screens/TelaDetalheProduto';
import {theme} from './src/theme/theme';

export type RootStackParamList = {
    ListaProdutos: undefined;
    DetalheProduto: { produtoId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="light"/>
            <Stack.Navigator
                initialRouteName="ListaProdutos"
                screenOptions={{
                    headerStyle: {backgroundColor: theme.colors.background},
                    headerTintColor: theme.colors.text.title,
                    headerTitleStyle: {fontWeight: 'bold'},
                    contentStyle: {backgroundColor: theme.colors.background},
                }}
            >
                <Stack.Screen
                    name="ListaProdutos"
                    component={TelaListaProdutos}
                    options={{headerShown: false}}
                />
                <Stack.Screen name="DetalheProduto">
                    {(props) => (
                        <TelaDetalheProduto
                            {...props}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
