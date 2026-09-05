import {useMemo, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, TextInput,} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import {theme} from "../theme/theme";
import {ProdutoItem} from "../components/ProdutoItem";
import NovoProdutoModal from "../components/NovoProdutoModal";
import {Produto} from "../types/Produto";

type RootStackParamList = {
    ListaProdutos: undefined;
    DetalheProduto: { produtoId: number };
};

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ListaProdutos'>;
    produtos: Produto[];
    onAdicionarProduto: (produto: Produto) => void;
};

export default function TelaListaProdutos({navigation, produtos, onAdicionarProduto}: Props) {
    const [busca, setBusca] = useState('');

    const produtosFiltrados = useMemo(() => {
        return produtos.filter((produto) =>
            produto.nome.toLowerCase().includes(busca.toLowerCase())
        );
    }, [busca, produtos]);

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <NovoProdutoModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={onAdicionarProduto}/>
            <Text style={styles.titleText}>Catálogo</Text>
            <TextInput
                style={styles.inputBusca}
                placeholder="Buscar produtos"
                placeholderTextColor={theme.colors.text.placeholder}
                value={busca}
                onChangeText={setBusca}
            />
            <Pressable
                style={styles.floatingButton}
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <MaterialDesignIcons name='plus' color={theme.colors.text.contrast} size={32}/>
            </Pressable>
            <FlatList
                contentContainerStyle={styles.listaContainer}
                data={produtosFiltrados}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => (
                    <ProdutoItem
                        produto={item}
                        onPress={() =>
                            navigation.navigate('DetalheProduto', {produtoId: item.id})
                        }
                    />
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    floatingButton: {
        backgroundColor: theme.colors.primary,
        width: 60,
        height: 60,
        borderRadius: theme.borderRadius.lg,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 40,
        right: 30,
        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 999,
    },
    titleText: {
        color: theme.colors.text.title,
        fontSize: theme.fontSize.title,
        fontWeight: 'bold',
        marginLeft: theme.spacing.lg,
        marginTop: theme.spacing.lg,
    },
    inputBusca: {
        backgroundColor: theme.colors.cardBackground,
        color: theme.colors.text.title,
        height: 50,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.lg,
        fontSize: theme.fontSize.lg,
        marginHorizontal: theme.spacing.lg,
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.sm,
        borderWidth: 1,
        borderColor: theme.colors.cardBorder,
    },
    listaContainer: {
        padding: theme.spacing.lg,
        paddingBottom: theme.spacing.xxl,
    },
});
