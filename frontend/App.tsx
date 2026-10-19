import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';
import TelaListaProdutos from './src/screens/TelaListaProdutos';
import TelaDetalheProduto from './src/screens/TelaDetalheProduto';
import {theme} from './src/theme/theme';
import {produtosMock} from "./src/mocks/produtosMock";
import {Produto} from "./src/types/Produto";
import {useState} from "react";

export type RootStackParamList = {
    ListaProdutos: undefined;
    DetalheProduto: { produtoId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    const [produtos, setProdutos] = useState<Produto[]>(produtosMock);

    function adicionarProduto(novoProduto: Produto) {
        setProdutos((atual) => [novoProduto, ...atual]);
    }

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
                <Stack.Screen name="ListaProdutos"
                              options={{headerShown: false}}>
                    {(props) => (
                        <TelaListaProdutos
                            {...props}
                            produtos={produtos}
                            onAdicionarProduto={adicionarProduto}
                        />
                    )}

                </Stack.Screen>
                <Stack.Screen name="DetalheProduto">
                    {(props) => (
                        <TelaDetalheProduto
                            {...props}
                            produtos={produtos}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
