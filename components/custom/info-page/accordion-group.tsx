// CustomAccordion.tsx
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import NavigationButtons from '../navigation-buttons';

interface CustomAccordionProps {
    accordionParts: any[];
}

const AccordionGroup = ({ accordionParts}: CustomAccordionProps) => {
    return (
        <Accordion type="single" style={styles.accordionContainer}>
            {accordionParts.map((part: { title: string; text: string[] }, idx: number) => (
                <AccordionItem key={idx} value={idx.toString()} style={styles.accordionItem}>
                    <AccordionTrigger>
                        <Text style={styles.accordionTitle}>{part.title}</Text>
                    </AccordionTrigger>
                    <AccordionContent>
                        {part.text.map((line: string, idx2: number) => (
                            <Text key={idx2} style={styles.accordionText}>
                                {line}
                            </Text>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            ))}

        </Accordion>
    );
};

export default AccordionGroup;

const styles = StyleSheet.create({
    accordionContainer: {},
    accordionItem: { marginVertical: 10 },
    accordionTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    accordionText: { fontSize: 20, lineHeight: 24, marginVertical: 7 },
});
