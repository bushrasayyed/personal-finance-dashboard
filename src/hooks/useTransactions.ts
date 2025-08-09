import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, updateDoc, doc, writeBatch } from 'firebase/firestore';
import { db } from '../services/firebase';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category?: string;
  amount: number;
  date: string;
  notes?: string;
  title?: string;
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  //fetch all transactions
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'transactions'));
      const fetchedData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Transaction[];

      setTransactions(fetchedData);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };
  //update transaction by ID
  const updateTransaction = async (id: string, updatedData: Partial<Transaction>) => {
    try {
      const transactionRef = doc(db, 'transactions', id);
      await updateDoc(transactionRef, updatedData);
      await fetchTransactions();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };
  //delete single transactions by ID
  const deleteTransaction = async (id: string) => {
    try {
      const transactionRef = doc(db, 'transactions', id);
      await deleteDoc(transactionRef);
      await fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };
  //deleteAll
  const deleteAllTransactions = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'transactions'));
      const batch = writeBatch(db);

      snapshot.docs.forEach(docSnap => {
        batch.delete(doc(db, 'transactions', docSnap.id));
      });

      await batch.commit();
      await fetchTransactions(); // opt: update UI
    } catch (error) {
      console.error('Error deleting all transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    refetch: fetchTransactions,
    updateTransaction,
    deleteTransaction,
    deleteAllTransactions,
  };
};
