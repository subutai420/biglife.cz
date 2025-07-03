import { Button } from './ui/button';
import { TrendingUp, Shield, Clock, DollarSign, ArrowRight, Sparkles } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  const { content } = useAdmin();
  const { hero } = content;

  return (
    <section id="uvod" className="bg-aurora py-20 pt-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Hero Image */}
          <div className="mb-8">
            <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop&crop=center"
                alt="Moderní bytová jednotka - investiční příležitost"
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Investiční příležitost</p>
                      <p className="font-semibold text-gray-900">Moderní byt 3+1, Praha</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Výnos</p>
                      <p className="text-lg font-bold text-green-600">6% p.a.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl mb-6 text-gray-900 max-w-4xl mx-auto drop-shadow-sm">
            {hero.title}
          </h1>
          <p className="text-xl text-gray-800 mb-8 max-w-3xl mx-auto drop-shadow-sm">
            {hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg" asChild>
              <a href="#jak-to-funguje">{hero.ctaPrimary}</a>
            </Button>
            <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800 shadow-lg border-0" asChild>
              <a href="#kontakt">{hero.ctaSecondary}</a>
            </Button>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="bg-white/90 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200 shadow-lg">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mb-2 text-gray-900 drop-shadow-sm text-lg font-bold">Garantovaný výnos 6 % p.a.</h3>
            <p className="text-gray-800 drop-shadow-sm">Stabilní zisk, který vám banka nenabídne.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/90 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200 shadow-lg">
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="mb-2 text-gray-900 drop-shadow-sm text-lg font-bold">Minimální investice 50 000 Kč</h3>
            <p className="text-gray-800 drop-shadow-sm">Začněte investovat s dostupnou částkou.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/90 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200 shadow-lg">
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="mb-2 text-gray-900 drop-shadow-sm text-lg font-bold">Smluvní garance</h3>
            <p className="text-gray-800 drop-shadow-sm">Každá investice je zajištěna smlouvou o půjčce.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/90 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200 shadow-lg">
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="mb-2 text-gray-900 drop-shadow-sm text-lg font-bold">Flexibilní výběr</h3>
            <p className="text-gray-800 drop-shadow-sm">Své prostředky získáte zpět s 2měsíční výpovědní lhůtou.</p>
          </div>
        </div>

        {/* Enhanced Process Overview */}
        <div className="mt-20">
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-3xl backdrop-blur-sm border border-white/20"></div>
            
            {/* Main content */}
            <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="h-4 w-4" />
                  Jednoduchý proces
                </div>
                <h2 className="text-gray-900 mb-4">Jak to funguje</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Investování s námi je jednoduché a transparentní. Stačí tři kroky k vašemu pasivnímu příjmu.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                <div className="text-center relative">
                  <div className="relative mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25">
                      <span className="text-xl font-bold">1</span>
                    </div>
                    {/* Arrow connector */}
                    <div className="hidden md:block absolute top-8 left-full w-8 text-gray-300">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200/50">
                    <h3 className="mb-3 text-gray-900">Vy investujete</h3>
                    <p className="text-gray-600">Investice začíná od 50 000 Kč. Jednoduchá registrace a okamžité potvrzení.</p>
                  </div>
                </div>

                <div className="text-center relative">
                  <div className="relative mb-6">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/25">
                      <span className="text-xl font-bold">2</span>
                    </div>
                    {/* Arrow connector */}
                    <div className="hidden md:block absolute top-8 left-full w-8 text-gray-300">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200/50">
                    <h3 className="mb-3 text-gray-900">My nakoupíme a pronajmeme byt</h3>
                    <p className="text-gray-600">Vybereme kvalitní nemovitost v atraktivní lokalitě a zajistíme spolehlivé nájemníky.</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-green-500/25">
                      <span className="text-xl font-bold">3</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200/50">
                    <h3 className="mb-3 text-gray-900">Vy pobíráte zisk</h3>
                    <p className="text-gray-600">Každý měsíc dostáváte svůj podíl z pronájmu přímo na účet s garantovaným výnosem 6% ročně.</p>
                  </div>
                </div>
              </div>

              {/* Call to action */}
              <div className="text-center mt-12">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg" asChild>
                  <a href="#kontakt" className="inline-flex items-center gap-2">
                    Začít investovat
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}