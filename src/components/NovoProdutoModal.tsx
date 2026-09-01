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
    View
} from "react-native";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import {theme} from "../theme/theme";
import {useState} from "react";

type NovoProdutoModalProps = {
    visible: boolean;
    onClose: () => void;
    onSave?: () => void
}

export default function NovoProdutoModal(
    {visible, onClose, onSave}: NovoProdutoModalProps
) {
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState('');

    function limparFormulario() {
        setNome('');
        setCategoria('');
        setPreco('');
        setDescricao('');
        setImagem('');
    }

    function handleClose() {
        limparFormulario();
        onClose();
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={handleClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.modalBackdrop}
            >
                <Pressable
                    style={StyleSheet.absoluteFill}
                    onPress={handleClose}
                />
                <View style={styles.modalCard}>
                    <View style={styles.modalHeader}>
                        <View style={styles.modalHeaderTitleGroup}>
                            <View style={styles.modalHeaderIconContainer}>
                                <MaterialDesignIcons name="package-variant-closed-plus" size={20} color={theme.colors.primary}/>
                            </View>
                            <Text style={styles.modalTitle}>Adicionar Produto</Text>
                        </View>
                        <TouchableOpacity
                            onPress={handleClose}
                            style={styles.closeButton}
                            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                        >
                            <MaterialDesignIcons name="close" size={20} color={theme.colors.text.muted}/>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.formScrollContainer}
                    >
                        <View style={styles.formGroup}>
                            <Text style={styles.inputLabel}>Nome do Produto</Text>
                            <TextInput
                                style={styles.modalInput}
                                placeholder="Ex: Cadeira Gamer Ergonômica"
                                placeholderTextColor={theme.colors.text.placeholder}
                                value={nome}
                                onChangeText={setNome}
                            />
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
                                <Text style={styles.inputLabel}>Preço (R$)</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="0,00"
                                    placeholderTextColor={theme.colors.text.placeholder}
                                    keyboardType="numeric"
                                    value={preco}
                                    onChangeText={setPreco}
                                />
                            </View>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.inputLabel}>Descrição</Text>
                            <TextInput
                                style={[styles.modalInput, styles.textAreaInput]}
                                placeholder="Breve descrição e detalhes do produto..."
                                placeholderTextColor={theme.colors.text.placeholder}
                                multiline={true}
                                numberOfLines={3}
                                textAlignVertical="top"
                                value={descricao}
                                onChangeText={setDescricao}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.inputLabel}>URL da Imagem</Text>
                            <TextInput
                                style={styles.modalInput}
                                placeholder="https://exemplo.com/imagem.png"
                                placeholderTextColor={theme.colors.text.placeholder}
                                autoCapitalize="none"
                                value={imagem}
                                onChangeText={setImagem}
                            />
                        </View>
                    </ScrollView>

                    <View style={styles.modalFooter}>
                        <TouchableOpacity
                            style={styles.buttonCancel}
                            onPress={handleClose}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.buttonCancelText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonSave}
                            onPress={handleClose}
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
        backgroundColor: theme.colors.primaryLight,
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
