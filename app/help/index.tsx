import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Search, ChevronRight, MessageCircle, Phone, Mail, FileText, ShoppingBag, CreditCard, Truck } from 'lucide-react-native';

const faqs = [
  {
    id: '1',
    question: 'How do I track my order?',
    answer: 'You can track your order in the Profile section under "Order History". Click on any order to view its current status and tracking information.',
    icon: Truck,
  },
  {
    id: '2',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.',
    icon: CreditCard,
  },
  {
    id: '3',
    question: 'How can I return an item?',
    answer: 'To return an item, go to your order history, select the order containing the item you wish to return, and follow the return instructions. Returns must be initiated within 30 days of delivery.',
    icon: ShoppingBag,
  },
  {
    id: '4',
    question: 'Where can I find my order history?',
    answer: 'Your order history can be found in the Profile section. There you can view all past orders, track current orders, and manage returns.',
    icon: FileText,
  },
];

export default function HelpScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactUs = () => {
    router.push('/help/contact');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color="#666666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search help articles..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity style={styles.actionButton} onPress={handleContactUs}>
          <MessageCircle size={24} color="#FF4785" />
          <Text style={styles.actionButtonText}>Contact Support</Text>
          <ChevronRight size={20} color="#666666" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {filteredFaqs.map((faq) => (
          <TouchableOpacity
            key={faq.id}
            style={styles.faqItem}
            onPress={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
          >
            <View style={styles.faqHeader}>
              <faq.icon size={24} color="#FF4785" />
              <Text style={styles.faqQuestion}>{faq.question}</Text>
            </View>
            {expandedFaq === faq.id && (
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Contact Methods</Text>
        <View style={styles.contactMethods}>
          <View style={styles.contactMethod}>
            <Phone size={24} color="#FF4785" />
            <Text style={styles.contactMethodTitle}>Phone Support</Text>
            <Text style={styles.contactMethodText}>1-800-123-4567</Text>
            <Text style={styles.contactMethodSubtext}>Mon-Fri, 9am-5pm EST</Text>
          </View>
          <View style={styles.contactMethod}>
            <Mail size={24} color="#FF4785" />
            <Text style={styles.contactMethodTitle}>Email Support</Text>
            <Text style={styles.contactMethodText}>support@example.com</Text>
            <Text style={styles.contactMethodSubtext}>24/7 Response</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    margin: 16,
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  actionButtonText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: '#1a1a1a',
  },
  faqItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
    color: '#1a1a1a',
  },
  faqAnswer: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
    color: '#666666',
    paddingLeft: 36,
  },
  contactSection: {
    padding: 16,
  },
  contactMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactMethod: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fffffff',
    padding: 16,
    margin: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  contactMethodTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
    color: '#1a1a1a',
  },
  contactMethodText: {
    fontSize: 14,
    color: '#FF4785',
    marginBottom: 4,
  },
  contactMethodSubtext: {
    fontSize: 12,
    color: '#666666',
  },
});