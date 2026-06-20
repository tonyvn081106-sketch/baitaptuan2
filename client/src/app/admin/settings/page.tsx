"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Save, Lock, Phone, Mail, Bell, MessageSquare } from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('security');
  const [isSaving, setIsSaving] = useState(false);

  // Security Form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Contact Form
  const [contactForm, setContactForm] = useState({
    phone: '0988.123.456',
    email: 'contact@homestayhanoi.com',
    address: '123 Phố Cổ, Hoàn Kiếm, Hà Nội'
  });

  // Notification Templates
  const [templates, setTemplates] = useState({
    bookingSuccess: 'Xin chào [TEN_KHACH], cảm ơn bạn đã đặt [TEN_PHONG] tại [TEN_NHA].',
    forgotPassword: 'Bạn đã yêu cầu khôi phục mật khẩu. Nhấp vào link dưới đây để đặt lại.'
  });

  // Events Toggle
  const [events, setEvents] = useState({
    bookingCreated: true,
    bookingCancelled: true,
    marketingEmails: false
  });

  // Load from local storage if exists
  useEffect(() => {
    const savedContact = localStorage.getItem('admin_contact');
    if (savedContact) setContactForm(JSON.parse(savedContact));
    
    const savedTemplates = localStorage.getItem('admin_templates');
    if (savedTemplates) setTemplates(JSON.parse(savedTemplates));

    const savedEvents = localStorage.getItem('admin_events');
    if (savedEvents) setEvents(JSON.parse(savedEvents));
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Mật khẩu mới không khớp!');
      return;
    }
    setIsSaving(true);
    try {
      await (api as any).changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      alert('Đổi mật khẩu thành công!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      alert('Sai mật khẩu hiện tại hoặc có lỗi xảy ra!');
    }
    setIsSaving(false);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('admin_contact', JSON.stringify(contactForm));
    alert('Lưu thông tin liên hệ thành công!');
  };

  const handleSaveTemplates = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('admin_templates', JSON.stringify(templates));
    alert('Lưu Mẫu thông báo thành công!');
  };

  const handleSaveEvents = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('admin_events', JSON.stringify(events));
    alert('Cập nhật Sự kiện thông báo thành công!');
  };

  return (
    <div className="max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Cài đặt Hệ thống</h2>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 border-r border-gray-200 bg-gray-50 flex flex-col">
          <button 
            onClick={() => setActiveTab('security')}
            className={`p-4 flex items-center space-x-3 text-sm font-bold transition ${activeTab === 'security' ? 'bg-white text-[#003b95] border-r-2 border-[#003b95]' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Lock size={18} />
            <span>Bảo mật (Mật khẩu)</span>
          </button>
          <button 
            onClick={() => setActiveTab('contact')}
            className={`p-4 flex items-center space-x-3 text-sm font-bold transition ${activeTab === 'contact' ? 'bg-white text-[#003b95] border-r-2 border-[#003b95]' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Phone size={18} />
            <span>Liên hệ Website</span>
          </button>
          <button 
            onClick={() => setActiveTab('templates')}
            className={`p-4 flex items-center space-x-3 text-sm font-bold transition ${activeTab === 'templates' ? 'bg-white text-[#003b95] border-r-2 border-[#003b95]' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <MessageSquare size={18} />
            <span>Mẫu thông báo</span>
          </button>
          <button 
            onClick={() => setActiveTab('events')}
            className={`p-4 flex items-center space-x-3 text-sm font-bold transition ${activeTab === 'events' ? 'bg-white text-[#003b95] border-r-2 border-[#003b95]' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Bell size={18} />
            <span>Sự kiện Thông báo</span>
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-8">
          {activeTab === 'security' && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Đổi mật khẩu Quản trị viên</h3>
              <form onSubmit={handleChangePassword} className="max-w-md space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu hiện tại</label>
                  <input 
                    required type="password" 
                    className="w-full text-gray-900 font-normal focus:font-bold border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#0071c2] outline-none"
                    value={passwordForm.currentPassword}
                    onChange={e => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu mới</label>
                  <input 
                    required type="password" 
                    className="w-full text-gray-900 font-normal focus:font-bold border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#0071c2] outline-none"
                    value={passwordForm.newPassword}
                    onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Xác nhận mật khẩu mới</label>
                  <input 
                    required type="password" 
                    className="w-full text-gray-900 font-normal focus:font-bold border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#0071c2] outline-none"
                    value={passwordForm.confirmPassword}
                    onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="bg-[#0071c2] text-white px-6 py-2 rounded font-bold hover:bg-[#005999] transition flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>{isSaving ? 'Đang lưu...' : 'Đổi mật khẩu'}</span>
                </button>
              </form>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Thông tin Liên hệ trên Website</h3>
              <form onSubmit={handleSaveContact} className="max-w-md space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Số điện thoại Hotline</label>
                  <input 
                    required type="text" 
                    className="w-full text-gray-900 font-normal focus:font-bold border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#0071c2] outline-none"
                    value={contactForm.phone}
                    onChange={e => setContactForm({...contactForm, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email hỗ trợ</label>
                  <input 
                    required type="email" 
                    className="w-full text-gray-900 font-normal focus:font-bold border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#0071c2] outline-none"
                    value={contactForm.email}
                    onChange={e => setContactForm({...contactForm, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Địa chỉ Trụ sở</label>
                  <input 
                    required type="text" 
                    className="w-full text-gray-900 font-normal focus:font-bold border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#0071c2] outline-none"
                    value={contactForm.address}
                    onChange={e => setContactForm({...contactForm, address: e.target.value})}
                  />
                </div>
                <button 
                  type="submit" 
                  className="bg-[#0071c2] text-white px-6 py-2 rounded font-bold hover:bg-[#005999] transition flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>Lưu thông tin</span>
                </button>
              </form>
            </div>
          )}

          {activeTab === 'templates' && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Tuỳ chỉnh Mẫu thông báo (Templates)</h3>
              <p className="text-sm text-gray-500 mb-6">Bạn có thể sử dụng các biến [TEN_KHACH], [TEN_PHONG], [TEN_NHA] để cá nhân hoá thông báo.</p>
              <form onSubmit={handleSaveTemplates} className="max-w-2xl space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Xác nhận đặt lịch thành công</label>
                  <textarea 
                    rows={3} 
                    className="w-full text-gray-900 font-normal focus:font-bold border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#0071c2] outline-none"
                    value={templates.bookingSuccess}
                    onChange={e => setTemplates({...templates, bookingSuccess: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Khôi phục mật khẩu</label>
                  <textarea 
                    rows={3} 
                    className="w-full text-gray-900 font-normal focus:font-bold border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#0071c2] outline-none"
                    value={templates.forgotPassword}
                    onChange={e => setTemplates({...templates, forgotPassword: e.target.value})}
                  />
                </div>
                <button 
                  type="submit" 
                  className="bg-[#0071c2] text-white px-6 py-2 rounded font-bold hover:bg-[#005999] transition flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>Lưu Mẫu</span>
                </button>
              </form>
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Sự kiện kích hoạt thông báo</h3>
              <form onSubmit={handleSaveEvents} className="max-w-md space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 text-[#0071c2]"
                    checked={events.bookingCreated}
                    onChange={e => setEvents({...events, bookingCreated: e.target.checked})}
                  />
                  <span className="text-gray-800 font-medium">Gửi email/push khi có đơn đặt phòng mới</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 text-[#0071c2]"
                    checked={events.bookingCancelled}
                    onChange={e => setEvents({...events, bookingCancelled: e.target.checked})}
                  />
                  <span className="text-gray-800 font-medium">Gửi email/push khi đơn phòng bị Huỷ</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 text-[#0071c2]"
                    checked={events.marketingEmails}
                    onChange={e => setEvents({...events, marketingEmails: e.target.checked})}
                  />
                  <span className="text-gray-800 font-medium">Cho phép gửi bản tin khuyến mãi (Marketing)</span>
                </label>
                
                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="bg-[#0071c2] text-white px-6 py-2 rounded font-bold hover:bg-[#005999] transition flex items-center space-x-2"
                  >
                    <Save size={16} />
                    <span>Lưu Cấu hình</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
