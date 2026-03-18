import { useState } from 'react';
import { tables, menuItems, categories, formatRupiah } from '@/data/menuData';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, UtensilsCrossed, Table2, Plus, Pencil, Trash2 } from 'lucide-react';

type Tab = 'tables' | 'menu';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<Tab>('tables');
  const baseUrl = window.location.origin;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Kelola meja, menu, dan QR code</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('tables')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'tables' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
            }`}
          >
            <Table2 className="w-4 h-4" /> Meja & QR
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'menu' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" /> Menu
          </button>
        </div>

        {/* Tables & QR */}
        {activeTab === 'tables' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Daftar Meja</h2>
              <span className="text-sm text-muted-foreground">{tables.length} meja</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {tables.map(table => {
                const url = `${baseUrl}/table/${table.number}`;
                return (
                  <div
                    key={table.id}
                    className="bg-card rounded-2xl p-4 border border-border/50 flex flex-col items-center"
                  >
                    <div className="bg-background p-2 rounded-xl mb-3">
                      <QRCodeSVG value={url} size={100} level="M" />
                    </div>
                    <h3 className="font-bold text-card-foreground" style={{ fontFamily: 'DM Sans, sans-serif' }}>Meja {table.number}</h3>
                    <p className="text-xs text-muted-foreground">{table.capacity} orang</p>
                    <p className="text-[10px] text-muted-foreground mt-1 truncate w-full text-center">{url}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Menu Management */}
        {activeTab === 'menu' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Daftar Menu</h2>
              <button className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold">
                <Plus className="w-4 h-4" /> Tambah Menu
              </button>
            </div>

            <div className="space-y-3">
              {menuItems.map(item => {
                const cat = categories.find(c => c.id === item.categoryId);
                return (
                  <div key={item.id} className="bg-card rounded-2xl p-3 border border-border/50 flex gap-3 items-center">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-card-foreground truncate" style={{ fontFamily: 'DM Sans, sans-serif' }}>{item.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{cat?.icon} {cat?.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${
                          item.isAvailable
                            ? 'bg-accent/10 text-accent'
                            : 'bg-destructive/10 text-destructive'
                        }`}>
                          {item.isAvailable ? 'Tersedia' : 'Habis'}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-primary mt-1">{formatRupiah(item.price)}</p>
                    </div>
                    <div className="flex gap-1">
                      <button className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
