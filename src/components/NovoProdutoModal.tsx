import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import {useState} from "react";
import {theme} from "../theme/theme";
import type {Produto} from "../types/Produto";

type NovoProdutoModalProps = {
    visible: boolean;
    onClose: () => void;
    onSave: (produto: Produto) => void;
};

type ErrosForm = {
    nome?: string;
    preco?: string;
    descricao?: string;
};

export default function NovoProdutoModal({
                                             visible,
                                             onClose,
                                             onSave,
                                         }: NovoProdutoModalProps) {
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [erros, setErros] = useState<ErrosForm>({});

    function limparFormulario() {
        setNome('');
        setCategoria('');
        setPreco('');
        setDescricao('');
        setErros({});
    }

    function fechar() {
        limparFormulario();
        onClose();
    }

    function validar(): boolean {
        const novosErros: ErrosForm = {};
        const precoLimpo = preco.trim().replace(',', '.');
        const precoNumerico = Number(precoLimpo);

        if (!nome.trim()) {
            novosErros.nome = 'O nome do produto é obrigatório.';
        }

        if (!preco.trim()) {
            novosErros.preco = 'O preço é obrigatório.';
        } else if (isNaN(precoNumerico) || precoNumerico <= 0) {
            novosErros.preco = 'Informe um preço válido maior que zero.';
        }
        if (!descricao.trim()) {
            novosErros.descricao = 'A descrição é obrigatória.';
        }

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    }

    function salvar() {
        if (!validar()) return;

        const precoNumerico = Number(preco.trim().replace(',', '.'));

        const novoProduto: Produto = {
            id: Date.now(),
            nome: nome.trim(),
            categoria: categoria.trim() || 'Geral',
            preco: Number(precoNumerico.toFixed(2)),
            descricao: descricao.trim(),
            imagem: `https://picsum.photos/seed/${Date.now()}/200`,
        };

        onSave(novoProduto);
        fechar();
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={fechar}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.modalBackdrop}
            >
                <Pressable
                    style={StyleSheet.absoluteFill}
                    onPress={fechar}
                />
                <View style={styles.modalCard}>
                    <View style={styles.modalHeader}>
                        <View style={styles.modalHeaderTitleGroup}>
                            <View style={styles.modalHeaderIconContainer}>
                                <MaterialDesignIcons
                                    name="package-variant-closed-plus"
                                    size={20}
                                    color={theme.colors.primary}
                                />
                            </View>
                            <Text style={styles.modalTitle}>Adicionar Produto</Text>
                        </View>
                        <TouchableOpacity
                            onPress={fechar}
                            style={styles.closeButton}
                            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                        >
                            <MaterialDesignIcons name="close" size={20} color={theme.colors.text.muted}/>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.formScrollContainer}
                    >
                        <View style={styles.formGroup}>
                            <Text style={styles.inputLabel}>Nome do Produto *</Text>
                            <TextInput
                                style={[
                                    styles.modalInput,
                                    erros.nome ? styles.inputError : null,
                                ]}
                                placeholder="Ex: Cadeira Gamer Ergonômica"
                                placeholderTextColor={theme.colors.text.placeholder}
                                value={nome}
                                onChangeText={(text) => {
                                    setNome(text);
                                    if (erros.nome) setErros((prev) => ({...prev, nome: undefined}));
                                }}
                            />
                            {erros.nome ? <Text style={styles.errorText}>{erros.nome}</Text> : null}
                        </View>

                        <View style={styles.formRow}>
                            <View style={[styles.formGroup, {flex: 1}]}>
                                <Text style={styles.inputLabel}>Categoria</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Ex: Móveis"
                                    placeholderTextColor={theme.colors.text.placeholder}
                                    value={categoria}
                                    onChangeText={setCategoria}
                                />
                            </View>

                            <View style={[styles.formGroup, {flex: 1}]}>
                                <Text style={styles.inputLabel}>Preço (R$) *</Text>
                                <TextInput
                                    style={[
                                        styles.modalInput,
                                        erros.preco ? styles.inputError : null,
                                    ]}
                                    placeholder="0,00"
                                    placeholderTextColor={theme.colors.text.placeholder}
                                    keyboardType="numeric"
                                    value={preco}
                                    onChangeText={(text) => {
                                        setPreco(text);
                                        if (erros.preco) setErros((prev) => ({...prev, preco: undefined}));
                                    }}
                                />
                                {erros.preco ? <Text style={styles.errorText}>{erros.preco}</Text> : null}
                            </View>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.inputLabel}>Descrição</Text>
                            <TextInput
                                style={[styles.modalInput, styles.textAreaInput,
                                    erros.descricao ? styles.inputError : null,
                                ]}
                                placeholder="Breve descrição e detalhes do produto..."
                                placeholderTextColor={theme.colors.text.placeholder}
                                multiline={true}
                                numberOfLines={3}
                                textAlignVertical="top"
                                value={descricao}
                                onChangeText={(text) => {
                                    setDescricao(text);
                                    if (erros.descricao) setErros((prev) => ({...prev, descricao: undefined}));
                                }
                                }
                            />
                        </View>
                    </ScrollView>

                    <View style={styles.modalFooter}>
                        <TouchableOpacity
                            style={styles.buttonCancel}
                            onPress={fechar}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.buttonCancelText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonSave}
                            onPress={salvar}
                            activeOpacity={0.8}
                        >
                            <MaterialDesignIcons name="check" size={18} color={theme.colors.text.contrast}/>
                            <Text style={styles.buttonSaveText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackdrop: {
        flex: 1,
        backgroundColor: theme.colors.modalBackground,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    modalCard: {
        backgroundColor: theme.colors.cardBackground,
        borderRadius: theme.borderRadius.xl,
        borderWidth: 1,
        borderColor: theme.colors.cardBorder,
        width: '100%',
        maxWidth: 500,
        maxHeight: '90%',
        padding: theme.spacing.xl,
        shadowColor: theme.colors.shadow,
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: theme.spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.cardBorder,
    },
    modalHeaderTitleGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    modalHeaderIconContainer: {
        width: 32,
        height: 32,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.iconSurface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        color: theme.colors.text.title,
        fontSize: theme.fontSize.xl,
        fontWeight: 'bold',
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.cardBorder,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formScrollContainer: {
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.sm,
    },
    formGroup: {
        marginBottom: 14,
    },
    formRow: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    inputLabel: {
        color: theme.colors.text.body,
        fontSize: theme.fontSize.sm,
        fontWeight: '600',
        marginBottom: 6,
    },
    inputError: {
        borderColor: theme.colors.danger,
    },
    errorText: {
        color: theme.colors.danger,
        fontSize: theme.fontSize.xs,
        marginTop: 4,
    },
    modalInput: {
        backgroundColor: theme.colors.background,
        color: theme.colors.text.title,
        height: 46,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.md,
        fontSize: theme.fontSize.md,
        borderWidth: 1,
        borderColor: theme.colors.cardBorder,
    },
    textAreaInput: {
        height: 80,
        paddingTop: 10,
        paddingBottom: 10,
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 10,
        marginTop: theme.spacing.md,
        paddingTop: 14,
        borderTopWidth: 1,
        borderTopColor: theme.colors.cardBorder,
    },
    buttonCancel: {
        paddingVertical: 10,
        paddingHorizontal: theme.spacing.lg,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.cardBorder,
    },
    buttonCancelText: {
        color: theme.colors.text.body,
        fontSize: theme.fontSize.md,
        fontWeight: '600',
    },
    buttonSave: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.primary,
    },
    buttonSaveText: {
        color: theme.colors.text.contrast,
        fontSize: theme.fontSize.md,
        fontWeight: 'bold',
    },
});