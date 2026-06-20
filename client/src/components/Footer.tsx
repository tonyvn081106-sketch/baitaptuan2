import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#003b95] text-white pt-12 pb-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        
        {/* Cột 1 */}
        <div>
          <h4 className="font-bold text-lg mb-4">Về chúng tôi</h4>
          <ul className="space-y-3 text-white/80">
            <li><Link href="#" className="hover:text-white transition">Giới thiệu HomeStay VN</Link></li>
            <li><Link href="#" className="hover:text-white transition">Tuyển dụng</Link></li>
            <li><Link href="#" className="hover:text-white transition">Du lịch bền vững</Link></li>
            <li><Link href="#" className="hover:text-white transition">Báo chí & Truyền thông</Link></li>
          </ul>
        </div>

        {/* Cột 2 */}
        <div>
          <h4 className="font-bold text-lg mb-4">Hỗ trợ khách hàng</h4>
          <ul className="space-y-3 text-white/80">
            <li><Link href="#" className="hover:text-white transition">Trung tâm trợ giúp</Link></li>
            <li><Link href="#" className="hover:text-white transition">Hướng dẫn đặt phòng</Link></li>
            <li><Link href="#" className="hover:text-white transition">Chính sách thanh toán</Link></li>
            <li><Link href="#" className="hover:text-white transition">Quy định hủy & Hoàn tiền</Link></li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div>
          <h4 className="font-bold text-lg mb-4">Dành cho đối tác</h4>
          <ul className="space-y-3 text-white/80">
            <li><Link href="/host" className="hover:text-white transition font-semibold text-yellow-300">Đăng nhà Homestay miễn phí</Link></li>
            <li><Link href="#" className="hover:text-white transition">Quy định dành cho đối tác</Link></li>
            <li><Link href="#" className="hover:text-white transition">Trợ giúp đối tác</Link></li>
            <li><Link href="#" className="hover:text-white transition">Đăng nhập cổng Extranet</Link></li>
          </ul>
        </div>

        {/* Cột 4 - Liên hệ */}
        <div>
          <h4 className="font-bold text-lg mb-4">Liên hệ với chúng tôi</h4>
          <ul className="space-y-4 text-white/90">
            <li className="flex items-start gap-3">
              <Phone size={18} className="mt-0.5 text-blue-300" />
              <div>
                <p className="font-semibold text-base text-yellow-400">0866 154 164</p>
                <p className="text-xs text-white/60">Hỗ trợ khách hàng 24/7</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-blue-300" />
              <a href="mailto:bfd@homestay.vn" className="hover:text-white transition">
                bfd@homestay.vn
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 text-blue-300" />
              <span className="leading-tight">
                Tầng 12, Tòa nhà Văn phòng<br />Hà Nội, Việt Nam
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-white/20 text-center text-xs text-white/60">
        <p className="font-medium text-sm text-white/80 mb-2">Bản quyền © {new Date().getFullYear()} HomeStay VN. Bảo lưu mọi quyền.</p>
        <p>Hệ thống đặt phòng Homestay hàng đầu dành cho sinh viên và người đi làm.</p>
      </div>
    </footer>
  );
}
